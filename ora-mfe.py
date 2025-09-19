from tutormfe.hooks import MFE_APPS
from tutor import hooks

hooks.Filters.ENV_PATCHES.add_items([
    (
        "openedx-cms-development-settings",
        """
# Used for the frontend-app-ora MFE
ORA_MICROFRONTEND_URL = "http://apps.local.openedx.io:1992"
CORS_ORIGIN_WHITELIST.append("http://apps.local.openedx.io:1992")
LOGIN_REDIRECT_WHITELIST.append("http://apps.local.openedx.io:1992")
CSRF_TRUSTED_ORIGINS.append("http://apps.local.openedx.io:1992")
        """
    ),
    (
"openedx-lms-development-settings",
"""
# frontend-app-ora MFE
MFE_CONFIG["ORA_MICROFRONTEND_URL"] = "http://apps.local.openedx.io:1992"
ORA_MICROFRONTEND_URL = "http://apps.local.openedx.io:1992"
"""
    ),
])

@MFE_APPS.add()
def add_ora_mfe(mfes):
    mfes["ora"] = {
        "repository": "https://github.com/openedx/frontend-app-ora.git",
        "port": 1992,  # Choose an unused port
        "version": "master",  # or use a specific release tag like "open-release/teak.2"
    }
    return mfes