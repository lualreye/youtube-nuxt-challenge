describe('import components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('../pages/login.vue');
    expect(cmp).toBeDefined();
  });
})