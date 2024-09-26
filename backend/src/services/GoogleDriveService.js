import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

class GoogleDriveService {
  constructor (credentialsPath, applicationName) {
    this.credentialsPath = credentialsPath
    this.applicationName = applicationName
    this.SCOPES = ['https://www.googleapis.com/auth/drive.file']
  }

  async getDriveService () {
    const auth = new GoogleAuth({
      keyFile: this.credentialsPath,
      scopes: this.SCOPES
    })
    const authClient = await auth.getClient()
    return google.drive({ version: 'v3', auth: authClient })
  }

  async createFolder (folderName, parentFolderId) {
    const drive = await this.getDriveService()
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : []
    }
    const folder = await drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    })
    return folder.data.id
  }

  async uploadFile (fileStream, fileName, mimeType, folderId) {
    const drive = await this.getDriveService()
    const fileMetadata = {
      name: fileName,
      parents: [folderId]
    }
    const media = {
      mimeType,
      body: fileStream
    }
    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink'
    })
    return file.data
  }

  async getFolderByName (parentFolderId, folderName) {
    const drive = await this.getDriveService()
    const query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed = false`
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name)'
    })
    return response.data.files[0]
  }

  async getFile (fileId) {
    const drive = await this.getDriveService()
    const response = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'stream' })
    return response.data
  }
}

export default GoogleDriveService
