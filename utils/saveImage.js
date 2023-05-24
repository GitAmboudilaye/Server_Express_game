const fs = require('fs');//  "file system" permet d'interagir avec le système de fichiers du serveur.
// Enregistrement d'un fichier image sur le système de fichiers

  exports.saveImage = async (imageBytes, filePath)=> {
    try {
        await fs.promises.writeFile(filePath, imageBytes);
        console.log(`L'image a été enregistrée sous ${filePath}`);
      } catch (error) {
        console.error(`Erreur lors de l'enregistrement de l'image : ${error}`);
      }
  }
  