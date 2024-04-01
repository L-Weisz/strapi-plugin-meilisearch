import React, { memo } from 'react'
import { Box, Button, TextInput, Typography } from '@strapi/design-system'
import { useCredential } from '../../Hooks/useCredential'
import { CheckPermissions } from '@strapi/helper-plugin'
import { PERMISSIONS } from '../../constants'

const Credentials = () => {
  const { host, apiKey, credentials, setHost, setApiKey, updateCredentials } =
    useCredential()
  return (
    <Box>
      <Box padding={2}>
        <TextInput
          placeholder="Host"
          label="Meilisearch Host"
          name="host"
          hint="The host on which your Meilisearch is running"
          value={host}
          onChange={e => setHost(e.target.value)}
          disabled={credentials.HostIsFromConfigFile}
        />
      </Box>
      <Box padding={2}>
        <TextInput
          placeholder="API key"
          label="Meilisearch API Key"
          name="apiKey"
          hint="A valid API key with enough permission to create indexes (or the master key)."
          onChange={e => setApiKey(e.target.value)}
          value={apiKey}
          disabled={credentials.ApiKeyIsFromConfigFile}
          aria-label="Password"
          type="password"
        />
      </Box>
      <Box paddingTop={1} paddingLeft={2}>
        <Typography variant="pi" style={{ color: 'red' }}>
          Do not use this API key on your front-end as it has too much rights.
          Instead, use the public key available using{' '}
          <a
            href="https://www.meilisearch.com/docs/reference/api/keys#get-keys"
            target="_blank"
            rel="noreferrer"
          >
            the key route
          </a>
          .
        </Typography>
      </Box>

      <Box paddingTop={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
        <CheckPermissions permissions={PERMISSIONS.settingsEdit}>
          <Button
            variant="secondary"
            onClick={() => updateCredentials()}
            disabled={
              credentials.ApiKeyIsFromConfigFile &&
              credentials.HostIsFromConfigFile
            }
          >
            Save
          </Button>
        </CheckPermissions>
      </Box>
    </Box>
  )
}

export default memo(Credentials)
