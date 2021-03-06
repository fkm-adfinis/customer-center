export default {
  de: 'German',
  en: 'English',

  global: {
    'search-placeholder': 'Search...',
    Username: 'Username',
    Password: 'Password',
    save: 'save',
    delete: 'delete',
    edit: 'edit',
    search: 'Search',
    empty: 'There is nothing to show here - yet!',
    cancel: 'Cancel',
    show: 'Show',
    back: 'Back',
    error: 'Oops something went wrong'
  },

  components: {
    'uk-pagination': {
      page: 'Page',
      of: 'of',
      next: 'Next',
      prev: 'Previous'
    }
  },

  login: {
    login: 'Sign in',
    'logging-in': 'Signing in',
    'forgot-password': 'Forgot password?',
    'send-new-password': 'Send new password',
    'sent-new-password':
      'Instructions to reset your password have been sent to your email',
    'your-new-password-is:': 'Your new password is:',
    'missing-identification': 'Please provide an username',
    'back-to-login': 'Back to login'
  },

  index: {
    greeting: 'Welcome',
    'our-tools': 'Our tools',
    'contact-us': 'Contact us',
    'create-ticket': 'Create support ticket',
    location: 'Location {{location}}',
    directions: 'Directions',
    'directions.bs.url':
      'https://www.adfinis-sygroup.ch/de/kontakt/directions-basel.html',
    'directions.be.url':
      'https://www.adfinis-sygroup.ch/de/kontakt/directions-bern.html',
    fax: 'Fax',
    phone: 'Phone',
    tools: {
      redmine: 'Redmine',
      'redmine.description': 'Managing tasks, bugs, etc.',

      gitlab: 'Gitlab',
      'gitlab.description': 'Code repository',

      rt: 'Request Tracker',
      'rt.description': 'Support-Requests by email',

      poweradmin: 'PowerAdmin',
      'poweradmin.description': 'DNS zone management',

      symonitoring: 'SyMonitoring',
      'symonitoring.description': 'Monitoring of servers and services',

      timed: 'Credits / Reports',
      'timed.description': 'Support subscriptions',

      ppa: 'PPA',
      'ppa.description': 'Manage your web-hostings',

      rhev: 'RHV',
      'rhev.description': 'Manage your virtual servers',

      mailcleaner: 'Mail Cleaner',
      'mailcleaner.description': 'Spam Filter'
    }
  },

  nav: {
    dashboard: 'Dashboard',
    vault: 'Vault',
    timed: 'Credits / Reports',
    gitlab: 'Projects',
    rt: 'Tickets',
    settings: 'Settings',
    logout: 'Sign out'
  },

  vault: {
    metadata: 'Metadata',
    secrets: 'Secrets',
    add: 'Add Entry',
    'delete-entry': 'Delete entire entry',
    value: 'Value',
    'save-success': 'Changes were saved.',
    'clipboard-success': 'The secret was saved to your clipboard.',
    'clipboard-error': 'The secret could not be saved to your clipboard.'
  },

  timed: {
    breadcrumbs: {
      reload: 'Reload',
      overview: 'Overview'
    },
    hours: 'Hours',
    date: 'Date',
    accept: 'Confirm',
    deny: 'Delete',
    time: {
      total: 'Time Total',
      used: 'Time Used',
      ordered: 'Time Ordered',
      unconfirmed: 'Needs confirmation'
    },

    durations: {
      minute: {
        one: 'Minute',
        other: 'Minutes'
      },
      hour: {
        one: 'Hour',
        other: 'Hours'
      }
    },
    index: {
      title: 'Credits / Reports',
      charge: 'Reload',
      details: 'Details'
    },

    reload: {
      price: 'Price',
      select: 'Select a Subscription-Package',
      success: 'Your order was saved successfully.',
      error:
        'An error occured while processing your order. Please check if your order was saved and if not, try again.',
      charge: 'Reload',
      'error-loading':
        "The orders for his project couldn't be loaded. Please try again.",
      noPackage: {
        title:
          "It seems like there aren't any Subscription Packages available.",
        text: 'To charge your time, please contact our Support under:',
        phone: 'Call'
      }
    },

    detail: {
      expense: 'Expense',
      charges: 'Past Charges',
      effort: 'Effort',
      employee: 'Employee',
      description: 'Description',
      acknowledged: 'Acknowledged',
      amount: 'Amount',
      errorLoading:
        'A Problem occured while fetching the data. Please try again.',
      loadMore: 'Load more'
    },
    admin: {
      subscriptions: 'Subscriptions',
      'confirm-subscription': 'Confirm subscriptions',
      reload: 'Reload',
      customer: 'Customer',
      project: 'Project',
      projects: 'Projects',
      billingType: 'Billing Type',
      admin: 'Admin',
      confirmSuccess: 'Order accepted.',
      confirmDeny: 'Order denied.',
      'reload-form-error': 'Please enter only valid numbers',
      form: 'Number of hours/minutes:',
      filter: 'Filter',
      timeAlmostConsumedFilter: 'Time almost consumed'
    }
  },

  gitlab: {
    projects: 'Projects',
    groups: 'Groups',
    commitsSince: 'Show Changes since:',
    allGroups: 'All Groups',
    placeholder: 'Search...',
    table: {
      project: 'Project',
      commits: 'Changes',
      pipelines: 'Pipelines'
    },
    commit: {
      one: '1 Change',
      other: '{{count}} Changes'
    },
    errors: {
      group: 'An error ocurred while loading the following group:',
      commits:
        'An error occured while loading the changes for the following group:',
      pipelines:
        'An error occured while loading the pipelines for the following group:'
    },
    empty: {
      groups: 'No GitLab groups found.',
      commits: 'There are no changes in the specified time span.',
      pipelines: 'The project has no pipelines.'
    },
    'pipeline-table': {
      stage: 'Stage',
      status: 'Status'
    },
    status: {
      failed: 'Failed',
      passed: 'Passed',
      created: 'Created',
      pending: 'Pending',
      running: 'Running'
    }
  },

  rt: {
    'all-states': 'All states',
    empty: 'No tickets found.',
    pageSize: 'Page size',
    breadcrumbs: {
      tickets: 'Tickets'
    },
    ticket: {
      effectiveid: 'ID',
      subject: 'Subject',
      status: 'Status',
      updated: 'Last updated',
      created: 'Created',
      creator: 'Creator',
      owner: 'Owner',
      states: {
        new: 'New',
        open: 'Open',
        stalled: 'Stalled',
        resolved: 'Resolved',
        rejected: 'Rejected',
        deleted: 'Deleted'
      }
    }
  },
  dashboard: {
    locations: 'Locations',
    links: { timed: 'Show all projects', tickets: 'Show all tickets' },
    remaining: ' remaining.',
    headers: { contact: 'Contact', tickets: 'Tickets', support: 'Support' },
    'contact-info':
      'From Monday-Friday we are available for you during office hours (08:00 to 17:30).',
    'support-info': 'You need support? Contact us by mail or by phone.',
    tickets: { open: 'open tickets', recent: 'Top 3 most recently updated' }
  }
}
