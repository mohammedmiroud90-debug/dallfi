# Cloudflare Variables Configuration

This document contains all the required environment variables and bindings needed to deploy the Dallfi Startup application on Cloudflare Workers.

## Environment Variables

### Parse Server Configuration
Required for connecting to the shared Parse backend for blog posts and comments.

```bash
PARSE_SERVER_URL=https://backendweb.eollinea.com/parse
PARSE_APP_ID=your_parse_app_id
PARSE_JAVASCRIPT_KEY=your_parse_javascript_key
```

**Setup Instructions:**
1. Set `PARSE_SERVER_URL` in wrangler.jsonc vars section
2. Set `PARSE_APP_ID` and `PARSE_JAVASCRIPT_KEY` as Cloudflare secrets:
   ```bash
   npx wrangler secret put PARSE_APP_ID
   npx wrangler secret put PARSE_JAVASCRIPT_KEY
   ```

### Cloudflare R2 Configuration
Required for media storage and incremental caching.

```bash
R2_PUBLIC_URL=https://pub-934e29ec90504f5c9f23a9b4f607b77a.r2.dev
```

**Setup Instructions:**
1. Set `R2_PUBLIC_URL` in wrangler.jsonc vars section
2. Ensure R2 bucket named `bucketblog` exists in your Cloudflare account
3. The bucket is automatically bound as `NEXT_INC_CACHE_R2_BUCKET` and `MEDIA_BUCKET`

### Site Configuration
Required for proper site functionality and multi-domain support.

```bash
NEXT_PUBLIC_SITE_URL=https://dallfi.com
NEXT_PUBLIC_SITE_HOSTS=dallfi.com,www.dallfi.com,dallfi.eu.cc,www.dallfi.eu.cc
```

**Setup Instructions:**
1. Set these in wrangler.jsonc vars section
2. Ensure custom domains are configured in your Cloudflare account before deployment
3. Update `NEXT_PUBLIC_SITE_HOSTS` to match your actual custom domains

### Admin Authentication
Required for the admin login functionality.

```bash
ADMIN_EMAIL=admin@dallfi.com
ADMIN_PASSWORD=your_secure_admin_password
```

**Setup Instructions:**
1. Set these as Cloudflare secrets for security:
   ```bash
   npx wrangler secret put ADMIN_EMAIL
   npx wrangler secret put ADMIN_PASSWORD
   ```
2. Use strong, unique credentials for production

## Cloudflare Bindings

These are configured in `wrangler.jsonc` and do not need to be set as environment variables:

### R2 Buckets
```json
"r2_buckets": [
  {
    "binding": "NEXT_INC_CACHE_R2_BUCKET",
    "bucket_name": "bucketblog"
  },
  {
    "binding": "MEDIA_BUCKET", 
    "bucket_name": "bucketblog"
  }
]
```

### Assets Binding
```json
"assets": {
  "directory": ".open-next/assets",
  "binding": "ASSETS"
}
```

### Images Binding
```json
"images": {
  "binding": "IMAGES"
}
```

### Services Binding
```json
"services": [
  {
    "binding": "WORKER_SELF_REFERENCE",
    "service": "dallfi-startup"
  }
]
```

## Custom Domains

Configure these domains in Cloudflare before deployment:

```json
"routes": [
  { "pattern": "dallfi.com", "custom_domain": true },
  { "pattern": "www.dallfi.com", "custom_domain": true },
  { "pattern": "dallfi.eu.cc", "custom_domain": true },
  { "pattern": "www.dallfi.eu.cc", "custom_domain": true }
]
```

## Compatibility Flags

```json
"compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"]
```

## Deployment Checklist

Before deploying to Cloudflare:

1. **Configure Environment Variables**
   - [ ] Update `PARSE_SERVER_URL` in wrangler.jsonc
   - [ ] Set `PARSE_APP_ID` as Cloudflare secret
   - [ ] Set `PARSE_JAVASCRIPT_KEY` as Cloudflare secret
   - [ ] Update `R2_PUBLIC_URL` in wrangler.jsonc
   - [ ] Update `NEXT_PUBLIC_SITE_URL` in wrangler.jsonc
   - [ ] Update `NEXT_PUBLIC_SITE_HOSTS` in wrangler.jsonc
   - [ ] Set `ADMIN_EMAIL` as Cloudflare secret
   - [ ] Set `ADMIN_PASSWORD` as Cloudflare secret

2. **Configure Cloudflare Resources**
   - [ ] Create R2 bucket named `bucketblog`
   - [ ] Set up custom domains in Cloudflare dashboard
   - [ ] Ensure domains are on the same Cloudflare account

3. **Build and Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Local Development**
   - Copy variables to `.dev.vars` file for local Workers preview
   - The `.dev.vars` file is gitignored for security

## Security Notes

- Never commit secrets to version control
- Always use Cloudflare secrets for sensitive data (API keys, passwords)
- Use strong, unique credentials for admin access
- Rotate secrets periodically
- Monitor Cloudflare dashboard for any unusual activity

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [R2 Storage Documentation](https://developers.cloudflare.com/r2/)
- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)