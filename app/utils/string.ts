export function padStr(number : number, numDigits : number){
    return (number < 0 ? '-':'') 
      + ((new Array(numDigits + 1).join("0"))
      + Math.abs(number)).slice(-numDigits);
  }