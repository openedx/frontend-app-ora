export TRANSIFEX_RESOURCE = frontend-app-ora

intl_imports = ./node_modules/.bin/intl-imports.js
transifex_utils = ./node_modules/.bin/transifex-utils.js
i18n = ./src/i18n
transifex_input = $(i18n)/transifex_input.json

# This directory must match .babelrc .
transifex_temp = ./temp/babel-plugin-formatjs

precommit:
	npm run lint
	npm audit

requirements:
	npm install

i18n.extract:
	# Pulling display strings from .jsx files into .json files...
	rm -rf $(transifex_temp)
	npm run-script i18n_extract

i18n.concat:
	# Gathering JSON messages into one file...
	$(transifex_utils) $(transifex_temp) $(transifex_input)

extract_translations: | requirements i18n.extract i18n.concat

# Despite the name, we actually need this target to detect changes in the incoming translated message files as well.
detect_changed_source_translations:
	# Checking for changed translations...
	git diff --exit-code $(i18n)

ifeq ($(OPENEDX_ATLAS_PULL),)
# Pulls translations from Transifex.
pull_translations:
	tx pull -t -f --mode reviewed --languages=$(transifex_langs)
else
# Pulls translations using atlas.
pull_translations:
	rm -rf src/i18n/messages
	mkdir src/i18n/messages
	cd src/i18n/messages \
	   && atlas pull $(ATLAS_OPTIONS) \
	            translations/frontend-component-footer/src/i18n/messages:frontend-component-footer \
	            translations/frontend-component-header/src/i18n/messages:frontend-component-header \
	            translations/frontend-app-ora/src/i18n/messages:frontend-app-ora

	$(intl_imports) frontend-component-header frontend-component-footer frontend-app-ora
endif
