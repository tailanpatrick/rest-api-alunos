import multer from 'multer';

// Configuração do multer para armazenar os arquivos no buffer
const storage = multer.memoryStorage(); // Usando a memória, ao invés de um diretório

const multerConfig = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB (ajuste conforme necessário)
  },
  fileFilter: (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos permitidos
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error('Tipo de arquivo não permitido.'));
    }
  }
};

export default multerConfig;
