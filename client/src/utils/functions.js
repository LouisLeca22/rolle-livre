export function getDate(date) {
    return new Date(Number(date)).toLocaleDateString()
  }
  
export function mustReturn(date) {
    if (date === null) {
      return false
    }
    const borrowedOn = new Date(Number(date))
    const threeMonthAfter = new Date(borrowedOn.getTime());
    threeMonthAfter.setMonth(borrowedOn.getMonth() + 3);
  
    const now = new Date()
  
    return (threeMonthAfter.getTime() < now.getTime())
  }

  export function valueAsDate(date){
        if(typeof(date) === "undefined"){
            return new Date().toISOString().substring(0,10)
        } else {
            return new Date(Number(date)).toISOString().substring(0,10)
        }
  }
