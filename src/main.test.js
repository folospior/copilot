'use strict';

const path = require('path');
const fs = require('fs');

describe('Electron app structure', () => {
  const root = path.join(__dirname, '..');

  test('package.json has required fields', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.name).toBe('copilot-pwa');
    expect(pkg.main).toBe('src/main.js');
    expect(pkg.devDependencies.electron).toBeDefined();
    expect(pkg.devDependencies['electron-builder']).toBeDefined();
  });

  test('package.json build config targets linux', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.build.linux).toBeDefined();
    expect(pkg.build.linux.target).toEqual(expect.arrayContaining(['AppImage', 'deb', 'rpm']));
  });

  test('src/main.js exists', () => {
    expect(fs.existsSync(path.join(root, 'src', 'main.js'))).toBe(true);
  });

  test('src/preload.js exists', () => {
    expect(fs.existsSync(path.join(root, 'src', 'preload.js'))).toBe(true);
  });

  test('assets/icon.png exists', () => {
    expect(fs.existsSync(path.join(root, 'assets', 'icon.png'))).toBe(true);
  });

  test('main.js loads copilot.microsoft.com', () => {
    const mainJs = fs.readFileSync(path.join(root, 'src', 'main.js'), 'utf8');
    expect(mainJs).toContain('https://copilot.microsoft.com');
  });

  test('main.js has security: contextIsolation enabled', () => {
    const mainJs = fs.readFileSync(path.join(root, 'src', 'main.js'), 'utf8');
    expect(mainJs).toContain('contextIsolation: true');
    expect(mainJs).toContain('nodeIntegration: false');
  });

  test('main.js has security: sandbox enabled', () => {
    const mainJs = fs.readFileSync(path.join(root, 'src', 'main.js'), 'utf8');
    expect(mainJs).toContain('sandbox: true');
  });

  test('preload.js uses contextBridge', () => {
    const preloadJs = fs.readFileSync(path.join(root, 'src', 'preload.js'), 'utf8');
    expect(preloadJs).toContain('contextBridge');
    expect(preloadJs).toContain('exposeInMainWorld');
  });
});
