export function formatDateBeforePostToCRM(date: string): string {
    const [day, month, year] = date.split('-')
  return `${year}-${month}-${day}`
}




export function formatWithDotDate(date: Date | string | number, numberOfDaysToAdd = 0):string {
    let currentDate = new Date(date)
    currentDate = new Date(currentDate.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000);
    const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure two-digit day
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
}

