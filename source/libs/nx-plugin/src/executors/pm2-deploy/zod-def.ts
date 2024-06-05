import { z } from 'zod'

export const pm2DeployInput = z.object({
  user: z.string().describe('ssh user'),
  host: z.string().describe('ssh host'),
  pemPath: z.string().optional().describe('ssh pem'),
  path: z.string().describe('remote host, path to deploy'),
  buildTarget: z.string().default('depended build target'),
  buildOutput: z.string().describe('depended build output'),
  extraOutput: z.array(z.string()).describe('extra output to scp'),
  pm2AppName: z.string().describe('ssh pm2 app name'),
})
