import { Barcode } from './Barcode'

describe('Barcode domain', () => {
  it('should be able to create a barcode with valid data', () => {
    const barcode = new Barcode('123456789012')
    expect(barcode.value).toBe('123456789012')
  })

  it('should throw an error if the barcode value is empty', () => {
    expect(() => new Barcode('')).toThrow(
      'O código de barras não pode ser vazio.'
    )
  })
  it('should throw an error if the barcode format is invalid', () => {
    const invalidBarcodes = [
      '123', // Muito curto
      '12345678901234', // Muito longo
      'ABCDEFGHIJKL', // Caracteres não numéricos
      '12345-67890', // Caracteres especiais
      '1234567A89012', // Letra no meio
    ]

    invalidBarcodes.forEach(invalidBarcode => {
      expect(() => new Barcode(invalidBarcode)).toThrow(
        'Formato de código de barras inválido.'
      )
    })
  })

  it('should be able to validate EAN 8 format', () => {
    const validEAN8Codes = ['96385074', '73513537', '12345670']

    validEAN8Codes.forEach(validEAN8 => {
      const barcode = new Barcode(validEAN8)
      expect(barcode.value).toBe(validEAN8)
    })
  })

  it('should be able to validate EAN 13 format', () => {
    const validEAN13Codes = ['4006381333931', '6950376772527']

    validEAN13Codes.forEach(validEAN13 => {
      const barcode = new Barcode(validEAN13)
      expect(barcode.value).toBe(validEAN13)
    })
  })
})
