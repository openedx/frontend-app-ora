frontend-app-ora
#############################

|license-badge| |status-badge| |ci-badge| |codecov-badge|


Purpose
*******

This repository is a template for Open edX micro-frontend applications. It is
flagged as a Template Repository, meaning it can be used as a basis for new
GitHub repositories by clicking the green "Use this template" button above.
The rest of this document describes how to work with your new micro-frontend
**after you've created a new repository from the template.**

Getting Started
***************

After copying the template repository, you'll want to do a find-and-replace to
replace all instances of ``frontend-app-ora`` with the name of
your new repository.  Also edit index.html to replace "Application Template"
with a friendly name for this application that users will see in their browser
tab.

Prerequisites
=============

The `devstack`_ is currently recommended as a development environment for your
new MFE.  If you start it with ``make dev.up.lms`` that should give you
everything you need as a companion to this frontend.

Note that it is also possible to use `Tutor`_ to develop an MFE.  You can refer
to the `relevant tutor-mfe documentation`_ to get started using it.

.. _Devstack: https://github.com/openedx/devstack

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

Cloning and Startup
===================

1. Clone your new repo:

  ``git clone https://github.com/openedx/frontend-app-ora.git``

2. Use node v18.x.

   The current version of the micro-frontend build scripts support node 18.
   Using other major versions of node *may* work, but this is unsupported.  For
   convenience, this repository includes an .nvmrc file to help in setting the
   correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Install npm dependencies:

  ``cd frontend-app-ora && npm install``

4. Update the application port to use for local development:

   Default port is 1992. If this does not work for you, update the line
   `PORT=1992` to your port in all .env.* files

5. Start the dev server:

  ``npm start``

The dev server is running at `http://localhost:1992 <http://localhost:1992>`_
or whatever port you setup.

Developing
**********

This section concerns development of ``frontend-app-ora`` itself,
not the templated copy.

It should be noted that one of the goals of this repository is for it to
function correctly as an MFE (as in ``npm install && npm start``) even if no
modifications are made.  This ensures that developers get a *practical* working
example, not just a theoretical one.

This also means, of course, that any committed code should be tested and
subject to both CI and branch protection rules.

Running MFE Locally with a plugin:
==================================

Introduction:
-------------
This MFE is not `enabled by default <https://github.com/overhangio/tutor-mfe/blob/release/tutormfe/plugin.py#L34>`_ in the `tutor-mfe plugin <https://github.com/overhangio/tutor-mfe?tab=readme-ov-file#micro-frontend-base-plugin-for-tutor>`_.
The file ``ora-mfe.py`` in the root of this repo makes use of the existing ``tutor-mfe`` plugin.

Prerequisites:
--------------
You can refer to the
`relevant tutor-mfe documentation <https://github.com/overhangio/tutor-mfe?tab=readme-ov-file#micro-frontend-base-plugin-for-tutor>`_
to setup with the existing ``tutor-mfe`` plugin ("mfe" in the plugin list).

You must also create the waffle_flag ``openresponseassessment.mfe_views`` and set to ``true`` for Everyone. See `How to enable a Waffle Flag <https://docs.openedx.org/en/latest/site_ops/how-tos/add-waffle-flag-for-user.html>`_ for more information.

Configuration Steps:
--------------------
The commands to run this MFE locally are:

1. Clone the repository (if you hadn't done so already)::

  ``git clone https://github.com/openedx/frontend-app-ora.git``

2. Change directories into the cloned repositiory::

  ``cd frontend-app-ora``

3. In your tutor virtual environment, run::

  ``tutor plugins install ora-mfe.py``. 
   
4. Run::
  
  ``tutor plugins printroot`` 
to show you where the module was installed.

5. You should see the plugin listed when you run::
  
  ``tutor plugins list``

6. To enable the plugin run::
  
  ``tutor plugins enable ora-mfe``
This will update the tutor configuration/environment files.

*VALIDATION PURPOSES ONLY:* If you ran the steps without any issues you should see the following configuration settings added to the files below:
    
``lms/development.py``::

  ORA_MICROFRONTEND_URL = "http://apps.local.openedx.io:1992/ora"
  CORS_ORIGIN_WHITELIST.append("http://apps.local.openedx.io:1992")
  LOGIN_REDIRECT_WHITELIST.append("apps.local.openedx.io:1992")
  CSRF_TRUSTED_ORIGINS.append("http://apps.local.openedx.io:1992")

``cms/development.py``::

  ORA_MICROFRONTEND_URL = "http://apps.local.openedx.io:1992/ora"
  CORS_ORIGIN_WHITELIST.append("http://apps.local.openedx.io:1992")
  LOGIN_REDIRECT_WHITELIST.append("apps.local.openedx.io:1992")
  CSRF_TRUSTED_ORIGINS.append("http://apps.local.openedx.io:1992")

Running the MFE:
----------------

From the tutor plugin bundle:
| 1. ``tutor images build mfe --no-cache`` 
| 2. ``tutor dev start lms cms mfe -d`` 

From the webpack dev server:
| 1. ``tutor mounts add <path-to-mfe-repo>``
| 2. From the mfe directory run ``npm run dev``

See the MFE in action:

| 3. Create an ``Open Response Assessment`` within studio.

Build Process Notes
===================

**Production Build**

The production build is created with ``npm run build``.


Getting Help
************

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/edx/frontend-app-ora/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/getting-help

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
************

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

The Open edX Code of Conduct
****************************

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

People
******

The assigned maintainers for this component and other project details may be
found in `Backstage`_. Backstage pulls this data from the ``catalog-info.yaml``
file in this repo.

.. _Backstage: https://open-edx-backstage.herokuapp.com/catalog/default/component/frontend-app-ora

Reporting Security Issues
*************************

Please do not report security issues in public, and email security@openedx.org instead.

.. |license-badge| image:: https://img.shields.io/github/license/openedx/frontend-app-ora.svg
    :target: https://github.com/edx/frontend-app-ora/blob/master/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/edx/frontend-app-ora/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/edx/frontend-app-ora/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/openedx/frontend-app-ora/coverage.svg?branch=master
    :target: https://codecov.io/github/openedx/frontend-app-ora?branch=master
    :alt: Codecov
