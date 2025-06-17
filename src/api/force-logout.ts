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
      "//*[self::div or self::span][normalize-space(text())='Sair' or normalize-space(text())='Log out' or normalize-space(text())='Desconectar' or normalize-space(text())='Disconnect']"
    );

    if (logoutButton) {
      await (logoutButton as ElementHandle<Element>).click();

      await page.waitForXPath(
        "//*[self::div or self::button or self::span][normalize-space(text())='Desconectar' or normalize-space(text())='Disconnect' or normalize-space(text())='Log out']",
        { timeout: 5000 }
      );

      const [confirmButton] = await page.$x(
        "//*[self::div or self::button or self::span][normalize-space(text())='Desconectar' or normalize-space(text())='Disconnect' or normalize-space(text())='Log out']"
      );

      if (confirmButton) {
        await (confirmButton as ElementHandle<Element>).click();
        return true;
      } else {
        console.warn(
          '[forceLogoutFromWeb] Botão de confirmação não encontrado.'
        );
        return false;
      }
    }

    console.warn(
      '[forceLogoutFromWeb] Botão de logout lateral não encontrado.'
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
