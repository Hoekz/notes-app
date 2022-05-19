import { test, expect } from '@playwright/test';

test('note app create and delete note', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click ul >> text=Create New Note
  await page.locator('ul >> text=Create New Note').click();

  // Click [placeholder="Title"]
  await page.locator('[placeholder="Title"]').click();

  // Fill [placeholder="Title"]
  await page.locator('[placeholder="Title"]').fill('Title of Note');

  // Press Tab
  await page.locator('[placeholder="Title"]').press('Tab');

  // Fill textarea
  await page.locator('textarea').fill('Write a note that is pretty cool.');

  // Press Tab
  await page.locator('textarea').press('Tab');

  // Press Enter
  await page.locator('button.save').first().press('Enter');

  // Click first item in list
  await page.locator('ul .list-item').nth(1).click();

  // Click ul div button >> nth=1
  await page.locator('button.delete').click();

});