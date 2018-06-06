import Component from '@ember/component';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { storageFor } from 'ember-local-storage';

import { action } from 'ember-decorators/object';
import { gt } from 'ember-decorators/object/computed';

import ChangeAccountSettingsValidations from '../../validations/change-account-settings';

import fromAmount from '../../utils/from-amount';

export default Component.extend({
  ChangeAccountSettingsValidations,

  settings: storageFor('settings', 'account'),

  account: null,
  onSave: null,
  onCancel: null,

  @gt('account.blockCount', 0) hasOpenBlock: false,

  @action
  async remove(account) {
    const balance = get(account, 'balance');
    if (fromAmount(balance).gt(0)) {
      const message = this.get('intl').t('wallets.accounts.cannotDelete');
      this.get('flashMessages').danger(message, { sticky: true });
      return false;
    }

    await account.destroyRecord();
    return false;
  },

  @action
  async save(changeset, account) {
    const label = get(changeset, 'label');
    if (label) {
      const settings = this.get('settings');
      tryInvoke(settings, 'setProperties', [{ label }]);
    }

    const representative = get(changeset, 'representative');
    if (representative && representative !== get(account, 'representative')) {
      set(account, 'representative', representative);
      await account.save();
    }

    return false;
  },
});
