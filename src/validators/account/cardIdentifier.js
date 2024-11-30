export const cardIdentifier = (number) => {
    if(!number || number.lenght < 16) return 'Invalid card number'; 

    const firstDigit = number.charAt(0); 

    if(number.startsWith("4")){
        return "Visa";
    } else if(number.startsWith("5") || number.startsWith("2")){
        return "MasterCard"; 
    } 
    return ""; 
};