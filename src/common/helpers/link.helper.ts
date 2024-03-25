// Importing the crypto library from node-forge
import crypto from 'node-forge'

// Function to create download links for different qualities
export const createDownloadLinks = (encryptedMediaUrl: string) => {
  // If the encryptedMediaUrl is not provided, return an empty array
  if (!encryptedMediaUrl) return []

  // Define the different qualities
  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' }
  ]

  // Define the key and iv for decryption
  const key = '38346591'
  const iv = '00000000'

  // Decrypt the encryptedMediaUrl
  const encrypted = crypto.util.decode64(encryptedMediaUrl)
  const decipher = crypto.cipher.createDecipher('DES-ECB', crypto.util.createBuffer(key))
  decipher.start({ iv: crypto.util.createBuffer(iv) })
  decipher.update(crypto.util.createBuffer(encrypted))
  decipher.finish()
  const decryptedLink = decipher.output.getBytes()

  // Return an array of objects, each containing a quality and the corresponding url
  return qualities.map((quality) => ({
    quality: quality.bitrate,
    url: decryptedLink.replace('_96', quality.id)
  }))
}

// Function to create image links for different qualities
export const createImageLinks = (link: string) => {
  // If the link is not provided, return an empty array
  if (!link) return [];

  // Define the different qualities
  const qualities = ["50x50", "150x150", "500x500"];
  const regex = /150x150|50x50/;

  // Return an array of objects, each containing a quality and the corresponding url
  return qualities.map((quality) => ({
    quality,
    url: link.replace(regex, quality),
  }));
};
