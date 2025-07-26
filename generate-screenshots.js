const { chromium } = require('playwright');
const path = require('path');

async function generateScreenshots() {
  const browser = await chromium.launch();
  
  try {
    // Screenshot 1280x800
    console.log('📸 Erstelle Screenshot (1280x800)...');
    const page1 = await browser.newPage();
    await page1.setViewportSize({ width: 1280, height: 800 });
    await page1.goto(`file://${path.join(__dirname, 'screenshot-generator.html')}`);
    await page1.waitForTimeout(1000);
    await page1.screenshot({ 
      path: 'chrome-store-screenshot.jpg',
      type: 'jpeg',
      quality: 90
    });
    console.log('✅ Screenshot erstellt: chrome-store-screenshot.jpg');

    // Kleine Werbekachel 440x280
    console.log('📸 Erstelle kleine Werbekachel (440x280)...');
    const page2 = await browser.newPage();
    await page2.setViewportSize({ width: 440, height: 280 });
    await page2.goto(`file://${path.join(__dirname, 'werbekachel-klein.html')}`);
    await page2.waitForTimeout(1000);
    await page2.screenshot({ 
      path: 'chrome-store-werbekachel-klein.jpg',
      type: 'jpeg',
      quality: 90
    });
    console.log('✅ Kleine Werbekachel erstellt: chrome-store-werbekachel-klein.jpg');

    // Große Werbekachel 1400x560
    console.log('📸 Erstelle große Werbekachel (1400x560)...');
    const page3 = await browser.newPage();
    await page3.setViewportSize({ width: 1400, height: 560 });
    await page3.goto(`file://${path.join(__dirname, 'werbekachel-gross.html')}`);
    await page3.waitForTimeout(2000); // Länger warten wegen Animation
    await page3.screenshot({ 
      path: 'chrome-store-werbekachel-gross.jpg',
      type: 'jpeg',
      quality: 90
    });
    console.log('✅ Große Werbekachel erstellt: chrome-store-werbekachel-gross.jpg');

    console.log('\n🎉 Alle Screenshots erfolgreich erstellt!');
    console.log('Die Dateien sind bereit für den Chrome Web Store Upload.');

  } catch (error) {
    console.error('❌ Fehler beim Erstellen der Screenshots:', error);
  } finally {
    await browser.close();
  }
}

generateScreenshots();