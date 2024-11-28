import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import QrCode from 'qrcode-reader';
import jimp from 'jimp';

// Test ID: 16 - Validar correcto codificación y decodificación de QR
describe('Validar correcto codificación y decodificación de QR', () => {
  it('Debería codificar y decodificar un código QR correctamente', async () => {
    const codVinculacion = '1234ABCD';

    // Generar el código QR
    const qrCode = await QRCode.toDataURL(codVinculacion);
    expect(qrCode).toBeDefined();

    // Decodificar el código QR
    const image = await jimp.read(Buffer.from(qrCode.split(',')[1], 'base64'));
    const qr = new QrCode();
    const decodedQR = await new Promise((resolve, reject) => {
      qr.callback = (err, value) => err != null ? reject(err) : resolve(value);
      qr.decode(image.bitmap);
    });

    expect(decodedQR.result).toBe(codVinculacion);
  });
});

// Test ID: 17 - Validar que el hasheo de password sea correcto
describe('Validar que el hasheo de password sea correcto', () => {
  it('Debería hashear y verificar una contraseña correctamente', async () => {
    const password = 'Password123!';
    const hashedPassword = bcrypt.hashSync(password, 10);

    expect(hashedPassword).toBeDefined();
    expect(bcrypt.compareSync(password, hashedPassword)).toBe(true);
  });
});