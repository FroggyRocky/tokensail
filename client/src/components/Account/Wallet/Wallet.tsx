import {useAuthStore} from "@store/authStore/authStore";
import {useQuery} from "@apollo/client";
import {GET_USER_WALLET_HISTORY} from '@api/queries'
import {WalletLayout} from "@components/Account/Wallet/WalletLayout";
import React, {useMemo, useRef, useState} from "react";
import {useObserver} from "@lib/hooks/hooks";
import {TransactionPreview} from "@UIKit/Transactions/TransactionPreview";
import {WalletActivityType} from '@store/accountStore/accountTypes'
import {Loader} from "@UIKit/Loader/Loader";

type Props = {};


const ITEMS_PER_PAGE = 30
type GetAllHistoryType = {
    getAllWalletHistory: {
        history: WalletActivityType
        count: number
    }
}

export function Wallet(props: Props) {
    const token = useAuthStore(state => state.auth_token);
    const [current_filter, setCurrentFilter] = useState<'inflow' | 'outflow' | 'all'>('all');
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [address_search, setAddressSearch] = useState<string>('');
    const lastElementRef = useRef(null)
    const [page, setPage] = useState<number>(1)
    const {loading, error, data, previousData, fetchMore, updateQuery} = useQuery<GetAllHistoryType>(GET_USER_WALLET_HISTORY, {
        variables: {
            limit: ITEMS_PER_PAGE,
            page: page
        },
        onCompleted: (data) => {
            const count = data.getAllWalletHistory.count
            if (count < ITEMS_PER_PAGE) {
                setHasMore(false)
            }
        },
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };
    const transaction = useMemo(() => {
        if (!data) return;
        let filteredTrx = data?.getAllWalletHistory.history
        if (address_search) {
            filteredTrx = filteredTrx?.filter(trx => trx.address.address.toLowerCase().includes(address_search.toLowerCase()))
        }
        if(current_filter !== 'all') {
            filteredTrx = filteredTrx?.filter(trx =>  trx.type === current_filter)
        }
        return filteredTrx?.map((transaction, index) => {
            if (filteredTrx?.length === index + 1) {
                return <div ref={lastElementRef} className={'px-3 py-5 bg-neutral-400 bg-opacity-15'}>
                    <TransactionPreview key={index} transaction={transaction.type} address={transaction.address.address}
                                        amount={transaction.amount} currency={transaction.currency.symbol}
                                        date={transaction.date.date}/>
                </div>
            }
            return <div className={'px-3 py-5 bg-neutral-400 bg-opacity-15 border-transparent rounded'}>
                <TransactionPreview key={index} transaction={transaction.type} address={transaction.address.address}
                                    amount={transaction.amount} currency={transaction.currency.symbol}
                                    date={transaction.date.date}/>
            </div>
        })
    }, [address_search, data, current_filter])

    async function observeCallback(entries: any, observer: any) {
        if (!hasMore) return
        if (entries[0].isIntersecting) {
            await fetchMore({
                variables: {
                    $limit: ITEMS_PER_PAGE,
                    $page: page
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                },
                updateQuery: (previousResult, {fetchMoreResult}) => {
                    const newEdges = fetchMoreResult?.getAllWalletHistory.history;
                    const count = fetchMoreResult?.getAllWalletHistory.count;
                    return newEdges.length
                        ? {
                            getAllWalletHistory: {
                                history: [...previousResult.getAllWalletHistory.history, ...newEdges],
                                count: count
                            }
                        }
                        : previousResult;
                }
            });
        }
    }

    function handleSearchChange(e: any) {
        setPage(1)
        setAddressSearch(e.target.value.replace(/\s/, ''))
    }

    useObserver(lastElementRef, observeCallback, observerOptions)
    if (loading || !data) return <Loader/>
    return <WalletLayout current_filter={current_filter} handleFilterChange={setCurrentFilter}
                         handleAddressSearchChange={handleSearchChange}>
        <div className={'flex flex-col gap-5'}>
        {transaction}
        </div>
    </WalletLayout>
};