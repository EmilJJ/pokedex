export default function serialize(data) {
  const body = [];
  if (data) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      body.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
  }

  return body.join('&');
}
