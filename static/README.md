Static Resources
================


Core
----
Core resources are versioned using semver folders.

They may not make reference to resources outside
that version or on remote domains.

Template
--------
Templates are used by webpack for vertical builds.
Currently this is only the base ```index.html```.

All other folders
-----------------
For example, ```homeandcontents```

Are versioned using semver folders.

Will contain the minimal resources that are not shared via core.

