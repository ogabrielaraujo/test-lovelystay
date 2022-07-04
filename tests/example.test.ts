function sum(a, b) {
  return a + b
}

it('should sum 2 numbers', () => {
  expect(sum(2, 4)).toBe(6)
})
