import os
import sys
import unittest.mock

# Patch env vars before any app modules are imported so config.py doesn't raise.
_env_patch = unittest.mock.patch.dict(
    os.environ,
    {"OPENAI_API_KEY": "test-openai-key", "YOUTUBE_API_KEY": "test-youtube-key"},
)
_env_patch.start()

# Remove any already-cached app modules so they re-import with the patched env.
for mod in list(sys.modules.keys()):
    if mod.startswith(("config", "main", "routers", "agent", "models")):
        del sys.modules[mod]
