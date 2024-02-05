const CheckValidUrl = (url: string) => {
  if (!url) {
    return false
  }

  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
}

export default CheckValidUrl
