import { Page, ElementHandle } from 'puppeteer';

export async function forceLogoutFromWeb(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector(
      'button[aria-label="Configurações"], button[aria-label="Settings"]',
      { timeout: 5000 }
    );
    await page.click(
      'button[aria-label="Configurações"], button[aria-label="Settings"]'
    );

    await page.waitForTimeout(500);

    const [logoutButton] = await page.$x(
      "//div[contains(@role,'button') and (text()='Sair' or text()='Log out' or text()='Desconectar')]"
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
