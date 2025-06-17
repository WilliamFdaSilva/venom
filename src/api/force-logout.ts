import { Page, ElementHandle } from 'puppeteer';

export async function forceLogoutFromWeb(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector('span[data-icon="menu"]', { timeout: 5000 });
    await page.click('span[data-icon="menu"]');

    await page.waitForSelector(
      'div[aria-label="Settings"], span[data-icon="settings"]',
      { timeout: 5000 }
    );
    await page.click('div[aria-label="Settings"], span[data-icon="settings"]');

    const [logoutButton] = await page.$x(
      "//div[text()='Log out' or text()='Sair']"
    );

    if (logoutButton) {
      const element = logoutButton as ElementHandle<Element>;
      await element.click();
      return true;
    }

    return false;
  } catch (error) {
    console.error(
      '[forceLogoutFromWeb] Erro ao tentar forçar logout:',
      (error as Error).message
    );
    return false;
  }
}
