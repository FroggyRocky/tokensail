exports.addressActions = `query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    inflow: transfers(
      options: {limit: $limit, offset: $offset, desc: "date.date"}
      date: {since: $from, till: $till}
      receiver: {is: $address}
    ) {
      address: sender {
        address
        annotation
      }
      currency {
        address
        symbol
      }
      amount
      date {
        date
      }
    }
    outflow: transfers(
      options: {limit: $limit, offset: $offset, desc: "date.date"}
      date: {since: $from, till: $till}
      sender: {is: $address}
    ) {
      address: receiver {
        address
        annotation
      }
      currency {
        address
        symbol
      }
      amount
      date {
        date
      }
    }
  }
}
`


exports.addressNfts = `query ($network: evm_network, $limit: Int!, $offset: Int!, $address: String) {
  EVM(dataset: combined, network: $network) {
    BalanceUpdates(
      orderBy: {descendingByField: "amount"}
      limit: {offset: $offset, count: $limit}
      where: {BalanceUpdate: {Address: {is: $address}}, Currency: {Fungible: false}}
    ) {
      Currency {
        Name
        Symbol
        SmartContract
      }
      BalanceUpdate {
        Address
        Id
        URI
      }
      amount: sum(of: BalanceUpdate_Amount)
      Block {
        Time(maximum: Block_Time)
      }
      count
      ChainId
      Transaction {
        Hash
      }
    }
  }
}
`