import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function localPersistencePlugin(): Plugin {
  return {
    name: 'local-persistence-plugin',
    configureServer(server) {
      // Ensure public/uploads directory exists
      const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const storyFile = path.resolve(process.cwd(), 'public', 'story_data.json');

      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        // 1. UPLOAD MEDIA HANDLER
        if (req.url === '/api/upload' && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf8');
              const { filename, dataUrl, type } = JSON.parse(bodyStr);

              if (!dataUrl || !filename) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing dataUrl or filename' }));
                return;
              }

              const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
              const uniqueFilename = `upload_${Date.now()}_${cleanName}`;
              const targetPath = path.join(uploadsDir, uniqueFilename);

              // Extract base64 payload
              const base64Data = dataUrl.includes(';base64,')
                ? dataUrl.split(';base64,').pop()
                : dataUrl;

              if (base64Data) {
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(targetPath, buffer);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    url: `/uploads/${uniqueFilename}`,
                    type: type || 'image',
                  })
                );
                return;
              }

              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid Base64 data' }));
            } catch (err) {
              console.error('API Upload error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Upload failed' }));
            }
          });
          return;
        }

        // 2. SAVE STORY STATE TO DISK
        if (req.url === '/api/save-story' && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf8');
              const { story } = JSON.parse(bodyStr);

              if (story) {
                fs.writeFileSync(storyFile, JSON.stringify(story, null, 2), 'utf8');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
                return;
              }

              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'No story provided' }));
            } catch (err) {
              console.error('API Save Story error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Save story failed' }));
            }
          });
          return;
        }

        // 3. GET SAVED STORY FROM DISK
        if (req.url === '/api/story' && req.method === 'GET') {
          try {
            if (fs.existsSync(storyFile)) {
              const content = fs.readFileSync(storyFile, 'utf8');
              const parsed = JSON.parse(content);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ exists: true, story: parsed }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ exists: false }));
          } catch (err) {
            console.error('API Get Story error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Get story failed' }));
          }
          return;
        }

        // 4. RESET STORY STATE ON DISK
        if (req.url === '/api/reset-story' && req.method === 'POST') {
          try {
            if (fs.existsSync(storyFile)) {
              fs.unlinkSync(storyFile);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            console.error('API Reset Story error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Reset failed' }));
          }
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localPersistencePlugin()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
});
