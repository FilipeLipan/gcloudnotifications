// Imports the Google Cloud Tasks library.
const {CloudTasksClient} = require('@google-cloud/tasks');

// Instantiates a client.
const client = new CloudTasksClient();

// TODO(developer): Uncomment these lines and replace with your values.
// const project = 'my-project-id';
// const queue = 'my-appengine-queue';
// const location = 'us-central1';
// const payload = 'Hello, World!';

// Construct the fully qualified queue name.
const parent = client.queuePath(project, location, queue);

const task = {
  appEngineHttpRequest: {
    httpMethod: 'POST',
    relativeUri: '/log_payload',
  },
};

if (payload) {
  task.appEngineHttpRequest.body = Buffer.from(payload).toString('base64');
}

if (inSeconds) {
  // The time when the task is scheduled to be attempted.
  task.scheduleTime = {
    seconds: inSeconds + Date.now() / 1000,
  };
}

console.log('Sending task:');
console.log(task);
// Send create task request.
const request = {parent, task};
const [response] = await client.createTask(request);
const name = response.name;
console.log(`Created task ${name}`);