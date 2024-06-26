import { z } from 'zod'
import { DownloadLinkModel } from '../../../common/model'

export const ArtistMapAPIResponseModel = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string()
})

export const ArtistMapModel = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.string(),
  image: z.array(DownloadLinkModel),
  url: z.string()
})
