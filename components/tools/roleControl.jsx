export default function roleControl(expectedRole, result1, result2) {
  if (currentUser?.role === expectedRole) {
    return result1;
  } else {
    return result2;
  }
}
