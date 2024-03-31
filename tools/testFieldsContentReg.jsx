export default function TestFieldsContentReg(name, destination, city, address, rooms, guests, price, description,images, setError) {

  if (!name) {
    setError("Please enter name of your accommodation");
    return;
  }
  if (!destination) {
    setError("Please enter your country");
    return;
  }
  if (!city) {
    setError("Please enter your city");
    return;
  }
  if (!address) {
    setError("Please enter yout address");
    return;
  }
  if (!rooms) {
    setError("Please enter number of rooms");
    return;
  }
  if (!guests) {
    setError("Please enter number of allowed guests");
    return;
  }
  if (!price) {
    setError("Please enter price");
    return;
  }
  if (!description) {
    setError("Please enter description of your accommodation");
    return;
  }
  if (!images) {
    setError("Please add images of your accommodation");
    return;
  }
  return true;
}