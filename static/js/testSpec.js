describe('Generate number test', function () {
  it('should generate a number between 0 and 3', function () {
    expect(genRandomInt()).toBeLessThanOrEqual(3)
  })
})
