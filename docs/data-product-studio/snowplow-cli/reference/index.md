---
title: Command Reference
date: 2025-06-16
sidebar_label: Command Reference
sidebar_position: 1
---

This page contains the complete reference for the Snowplow CLI commands.

## Data-Products


Work with Snowplow data products

### Examples

```
  $ snowplow-cli data-products validate
```

### Options

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
  -h, --help                  help for data-products
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
```

### Options inherited from parent commands

```
      --config string   Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                        Then on:
                          Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                          Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                          Windows %AppData%\snowplow\snowplow.yml
      --debug           Log output level to Debug
      --json-output     Log output as json
  -q, --quiet           Log output level to Warn
  -s, --silent          Disable output
```



## Data-Products Download


Download all data products, event specs and source apps from BDP Console

### Synopsis

Downloads the latest versions of all data products, event specs and source apps from BDP Console.

If no directory is provided then defaults to 'data-products' in the current directory. Source apps are stored in the nested 'source-apps' directory

```
snowplow-cli data-products download {directory ./data-products} [flags]
```

### Examples

```
  $ snowplow-cli dp download
  $ snowplow-cli dp download ./my-data-products
```

### Options

```
  -h, --help                   help for download
  -f, --output-format string   Format of the files to read/write. json or yaml are supported (default "yaml")
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Products Generate


Generate new data products and source applications locally

### Synopsis

Will write new data products and/or source application to file based on the arguments provided.

Example:
  $ snowplow-cli dp gen --source-app "Mobile app"
  Will result in a new source application getting written to './data-products/source-applications/mobile-app.yaml'

  $ snowplow-cli dp gen --data-product "Ad tracking" --output-format json --data-products-directory dir1
  Will result in a new data product getting written to './dir1/ad-tracking.json'


```
snowplow-cli data-products generate [paths...] [flags]
```

### Examples

```
  $ snowplow-cli dp generate --source-app "Mobile app" --source-app "Web app" --data-product "Signup flow"
```

### Options

```
      --data-product stringArray         Name of data product to generate
      --data-products-directory string   Directory to write data products to (default "data-products")
  -h, --help                             help for generate
      --output-format string             File format (yaml|json) (default "yaml")
      --source-app stringArray           Name of source app to generate
      --source-apps-directory string     Directory to write source apps to (default "data-products/source-apps")
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Products Publish


Publish all data products, event specs and source apps to BDP Console

### Synopsis

Publish the local version versions of all data products, event specs and source apps from BDP Console.

If no directory is provided then defaults to 'data-products' in the current directory. Source apps are stored in the nested 'source-apps' directory

```
snowplow-cli data-products publish {directory ./data-products} [flags]
```

### Examples

```
  $ snowplow-cli dp publish
  $ snowplow-cli dp download ./my-data-products
```

### Options

```
  -c, --concurrency int   The number of validation requests to perform at once (maximum 10) (default 3)
  -d, --dry-run           Only print planned changes without performing them
      --gh-annotate       Output suitable for github workflow annotation (ignores -s)
  -h, --help              help for publish
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Products Purge


Purges (permanently removes) all remote data products and source apps that do not exist locally

### Synopsis

Purges (permanently removes) all remote data products and source apps that do not exist locally.

If no directory is provided then defaults to 'data-products' in the current directory. Source apps are stored in the nested 'source-apps' directory

```
snowplow-cli data-products purge {directory ./data-products} [flags]
```

### Examples

```
  $ snowplow-cli dp purge
  $ snowplow-cli dp purge ./my-data-products
```

### Options

```
  -h, --help   help for purge
  -y, --yes    commit to purge
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Products Validate


Validate data products and source applications with BDP Console

### Synopsis

Sends all data products and source applications from \<path\> for validation by BDP Console.

```
snowplow-cli data-products validate [paths...] [flags]
```

### Examples

```
  $ snowplow-cli dp validate ./data-products ./source-applications
  $ snowplow-cli dp validate ./src
```

### Options

```
  -c, --concurrency int   The number of validation requests to perform at once (maximum 10) (default 3)
      --full              Perform compatibility check on all files, not only the ones that were changed
      --gh-annotate       Output suitable for github workflow annotation (ignores -s)
  -h, --help              help for validate
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures


Work with Snowplow data structures

### Examples

```
  $ snowplow-cli data-structures generate my_new_data_structure
  $ snowplow-cli ds validate
  $ snowplow-cli ds publish dev
```

### Options

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
  -h, --help                  help for data-structures
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
```

### Options inherited from parent commands

```
      --config string   Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                        Then on:
                          Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                          Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                          Windows %AppData%\snowplow\snowplow.yml
      --debug           Log output level to Debug
      --json-output     Log output as json
  -q, --quiet           Log output level to Warn
  -s, --silent          Disable output
```



## Data-Structures Download


Download all data structures from BDP Console

### Synopsis

Downloads the latest versions of all data structures from BDP Console.

Will retrieve schema contents from your development environment.
If no directory is provided then defaults to 'data-structures' in the current directory.

By default, data structures with empty schemaType (legacy format) are skipped.
Use --include-legacy to include them (they will be set to 'entity' schemaType).

```
snowplow-cli data-structures download {directory ./data-structures} [flags]
```

### Examples

```
  $ snowplow-cli ds download

  Download data structures matching com.example/event_name* or com.example.subdomain*
  $ snowplow-cli ds download --match com.example/event_name --match com.example.subdomain

  Download with custom output format and directory
  $ snowplow-cli ds download --output-format json ./my-data-structures

  Include legacy data structures with empty schemaType
  $ snowplow-cli ds download --include-legacy
```

### Options

```
  -h, --help                   help for download
      --include-legacy         Include legacy data structures with empty schemaType (will be set to 'entity')
      --match stringArray      Match for specific data structure to download (eg. --match com.example/event_name or --match com.example)
  -f, --output-format string   Format of the files to read/write. json or yaml are supported (default "yaml")
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures Generate


Generate a new data structure locally

### Synopsis

Will write a new data structure to file based on the arguments provided.

Example:
  $ snowplow-cli ds gen login_click --vendor com.example
  Will result in a new data structure getting written to './data-structures/com.example/login_click.yaml'
  The directory 'com.example' will be created automatically.

  $ snowplow-cli ds gen login_click
  Will result in a new data structure getting written to './data-structures/login_click.yaml' with
  an empty vendor field. Note that vendor is a required field and will cause a validation error if not completed.

```
snowplow-cli data-structures generate login_click {directory ./data-structures} [flags]
```

### Examples

```
  $ snowplow-cli ds generate my-ds
  $ snowplow-cli ds generate my-ds ./my-data-structures
```

### Options

```
      --entity                 Generate data structure as an entity
      --event                  Generate data structure as an event (default true)
  -h, --help                   help for generate
      --output-format string   Format for the file (yaml|json) (default "yaml")
      --vendor string          A vendor for the data structure.
                               Must conform to the regex pattern [a-zA-Z0-9-_.]+
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures Publish


Publishing commands for data structures

### Synopsis

Publishing commands for data structures

Publish local data structures to BDP console.


### Options

```
  -h, --help   help for publish
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures Publish Dev


Publish data structures to your development environment

### Synopsis

Publish modified data structures to BDP Console and your development environment

The 'meta' section of a data structure is not versioned within BDP Console.
Changes to it will be published by this command.
	

```
snowplow-cli data-structures publish dev [paths...] default: [./data-structures] [flags]
```

### Examples

```
  $ snowplow-cli ds publish dev
  $ snowplow-cli ds publish dev --dry-run
  $ snowplow-cli ds publish dev --dry-run ./my-data-structures ./my-other-data-structures
```

### Options

```
  -d, --dry-run       Only print planned changes without performing them
      --gh-annotate   Output suitable for github workflow annotation (ignores -s)
  -h, --help          help for dev
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures Publish Prod


Publish data structures to your production environment

### Synopsis

Publish data structures from your development to your production environment

Data structures found on \<path...\> which are deployed to your development
environment will be published to your production environment.
	

```
snowplow-cli data-structures publish prod [paths...] default: [./data-structures] [flags]
```

### Examples

```

	$ snowplow-cli ds publish prod
	$ snowplow-cli ds publish prod --dry-run
	$ snowplow-cli ds publish prod --dry-run ./my-data-structures ./my-other-data-structures
	
```

### Options

```
  -d, --dry-run   Only print planned changes without performing them
  -h, --help      help for prod
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Data-Structures Validate


Validate data structures with BDP Console

### Synopsis

Sends all data structures from \<path\> for validation by BDP Console.

```
snowplow-cli data-structures validate [paths...] default: [./data-structures] [flags]
```

### Examples

```
  $ snowplow-cli ds validate
  $ snowplow-cli ds validate ./my-data-structures ./my-other-data-structures
```

### Options

```
      --gh-annotate   Output suitable for github workflow annotation (ignores -s)
  -h, --help          help for validate
```

### Options inherited from parent commands

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --config string         Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                              Then on:
                                Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                                Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                                Windows %AppData%\snowplow\snowplow.yml
      --debug                 Log output level to Debug
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
      --json-output           Log output as json
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
  -q, --quiet                 Log output level to Warn
  -s, --silent                Disable output
```



## Mcp


Start MCP stdio server for Snowplow validation and context

### Synopsis

Start an MCP (Model Context Protocol) stdio server that provides tools for:
  - Validating Snowplow files (data-structures, data-products, source-applications)
  - Providing context and schemas for Snowplow types

```
snowplow-cli mcp [flags]
```

### Examples

```

  Claude Desktop config:
  {
    "mcpServers": {
      ...
      "snowplow-cli": {
        "command": "snowplow-cli", "args": ["mcp"]
      }
    }
  }

  VS Code:
  {
    "mcp": {
      ...
      "servers": {
        ...
        "snowplow-cli": {
          "command": "snowplow-cli", "args": ["mcp"]
        }
      }
    }
  }

Note:
  This server's validation tools require filesystem paths to validate assets. For full
  functionality, your MCP client needs filesystem write access so created assets can be
  saved as files and then validated.

Setup options:
  - Enable filesystem access in your MCP client, or
  - Run alongside an MCP filesystem server (e.g., @modelcontextprotocol/server-filesystem)

```

### Options

```
  -S, --api-key string        BDP console api key
  -a, --api-key-id string     BDP console api key id
      --dump-context          Dumps the result of the get_context tool to stdout and exits.
  -h, --help                  help for mcp
  -H, --host string           BDP console host (default "https://console.snowplowanalytics.com")
  -m, --managed-from string   Link to a github repo where the data structure is managed
  -o, --org-id string         Your organization id
```

### Options inherited from parent commands

```
      --config string   Config file. Defaults to $HOME/.config/snowplow/snowplow.yml
                        Then on:
                          Unix $XDG_CONFIG_HOME/snowplow/snowplow.yml
                          Darwin $HOME/Library/Application Support/snowplow/snowplow.yml
                          Windows %AppData%\snowplow\snowplow.yml
      --debug           Log output level to Debug
      --json-output     Log output as json
  -q, --quiet           Log output level to Warn
  -s, --silent          Disable output
```



