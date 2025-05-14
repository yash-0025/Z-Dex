export const shortenAddress = (address) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const formatBalance = (balance) => {
  if (!balance) return '0.00'
  return parseFloat(balance).toFixed(4)
}