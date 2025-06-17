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

    await page.waitForTimeout(800);

    const [logoutButton] = await page.$x(
      "//*[self::div or self::span][normalize-space(text())='Sair' or normalize-space(text())='Log out' or normalize-space(text())='Desconectar']"
    );

    if (logoutButton) {
      const element = logoutButton as ElementHandle<Element>;
      await element.click();
      return true;
    }

    console.warn(
      '[forceLogoutFromWeb] Botão de logout não encontrado na tela de configurações.'
    );
    return false;
  } catch (error) {
    console.error(
      '[forceLogoutFromWeb] Erro ao tentar forçar logout:',
      (error as Error).message
    );
    return false;
  }
}
