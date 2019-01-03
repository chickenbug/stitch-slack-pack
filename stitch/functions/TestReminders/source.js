exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  
  const RemindersClass = context.functions.execute('RemindersClass');
  const Reminders = new RemindersClass();
  Reminders.setAuthToken(testAuthToken);
  
  
  // Tests Begin
  const reminderAddResponse = await Reminders.add({
      text: 'always hydrate',
      time: 'in 1 minute'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('reminderAddResponse status', reminderAddResponse.ok, true);
  
  const reminderInfoResponse = await Reminders.info({
      reminder: reminderAddResponse.reminder.id,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('reminderInfoResponse status', reminderInfoResponse.ok, true);
  
  const reminderListResponse = await Reminders.list({})
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('reminderListResponse status', reminderListResponse.ok, true);
  
  const reminderCompleteResponse = await Reminders.complete({
      reminder: reminderAddResponse.reminder.id,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('reminderCompleteResponse status', reminderCompleteResponse.ok, true);
  
  const deleteReminderResponse = await Reminders.deleteReminder({
      reminder: reminderAddResponse.reminder.id,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('deleteReminderResponse status', deleteReminderResponse.ok, true);
};
