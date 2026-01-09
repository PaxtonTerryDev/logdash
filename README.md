# LogDash

An opinionated yet highly configurable logging utility for Typescript.

## Quick Start

First, you need to create an instance of a Logger object. It is generally recommended to create a single instance of this class, and export it to be used throughout your app. Generally, you will create this base log object with all of your app-wide configs, then branch off of it later with instance specific configs.  

```typescript 
// logger.ts

// This is also where you will pass in your config - this will be discussed later in the documentation.
// For now, we will just use the system defaults
const logger = new Logger();
export default logger;
```

The logger class creates `Log` objects, which have the following structure - 

```typescript 
interface Log<T> {
  id: string; // Auto generated
  level: LogLevel; // Created based on the method used to create the log
  timestamp: Date; // Created when the log is created (based off of system time)
  identifiers: string[]; // Defaults to an empty array, but each logger can have different identifiers
  message: string; // Message accompanying log.  Typically, this is what you would pass to a `console.log()` call.
  metadata: T; // Any additional data you wish to provide with the log.  This can be objects, arrays, anything. NOTE: this does not get printed in stdout.
}
```

You'll create the actual log objects by making a method call as follows.

```
// import the logger created in your logger.ts class

import logger from './logger.ts';

// using the `cp({})` method allows you to make a copy of a logger object.  This is a 1 to 1 copy.
// The `cp()` accepts a LogDashConfig object as an argument, so you can provide instance specific configs. Not recommended, but can be done.

const log = logger.cp()

// using the `prefix()` allows you to add a prefix / identifier to the log object.  
// This is usually a high level grouping, service name, etc, and allows aggregators to group related logs together.  
// This is especially useful in logging output from classes / services.

log.prefix("Root")

// This method can be chained together, so you can include multiple prefixes

log.prefix("Stalk").prefix("Branch")

// To create the log object, you will call the method associated with the level you want the log to be.
// Levels are debug(only outputs in stdout, when environment is not production (can be configured)), info, trace, warn, error and fatal (exits running process with an error code of 1)

// For all 'log' methods, the first argument is the message, the second (optional) is the metadata

const someData = {
    firstName: "Foo",
    lastName: "Bar"
}

log.info("Your message here", someData)

// If using the default configs (or have a stdout transport configured), you should see the output
// 2026-01-09T06:10:15.525Z [INFO] [Root|Stalk|Branch] Your message here,
{
    firstName: "Foo",
    lastName: "Bar"
}
```

## Transports

Transports are the core of structured logging.  They determine where your logs are sent. LogDash supports three different transport methods ->
    1. Stdout
    2. File
    3. JSON / HTTP

### Stdout

Stdout is the most common form of logging, where your logs are output to Stdout of the running process. In LogDash, this occurs in three stages.  
    1. You create the log object through one of the logging methods (like info, warn, etc)
    2. This log object is formatted into an output string based on your config
    3. console.log is used to print the formatted string to the console.
Setting up a stdout transport for development environments is highly recommended. Structuring logs in this fashion make them easier to read, and when color is enabled (it is by default), can make logs easier to read and understand.

Additionally, utilizing the `debug` log level 
```typescript 
log.debug("Endpoint hit!")
```
will only output in in development environments, so you don't muddy up your codebase / output logs with debug console logs that are only relevant to developers.

## Levels

### Debug

Only outputs in development environments. It first looks for a `LOGDASH_ENV` variable -> if not found, it will look for a `NODE_ENV1` variable.  If neither can be found, it does not output.

### Trace

Outputs the entire stack trace in the metadata field.  You can still provide your own metadata to this object, but this will overwrite any values with the name 'trace'.

### Info

General info log.  Used to communicate relevant but unimportant information

### Warn

Used to signify potential misuses or improper access.

### Error

Signifies that an error has happened.  Throws an error with the message and metadata passed to the error object.

### Fatal

Throws an error and exits the process.  Used when the error is unrecoverable or should force system shutdown. 
Prefer handling errors over this when possible. 

### File

File transports are simply writing stdout messages (like above) to a file.  This is useful for long term storage, and makes your logs searchable with tools like grep / ripgrep, or fuzzy finders. 

This transport is not typically recommended for production deployments, as you should most likely setup some kind of log aggregator you can ship your logs to.  Nevertheless, it's included by default, and only enabled by default in dev environments. 

LogDash ships with log rotations enabled. You can choose to rotate logs based on file size or date (create a new file when file sizes are larger than _X_ MB, vs. create a new log file each day / hour / month / etc.)

### JSON / HTTP

LogDash already has the `Log` objects structured, so this just stringifies the log and sends it to a predefined endpoint.  This is the only config in the app that has required properties. You must provide an endpoint url that the logs should be sent to.  The log object is sent in the body of the request. 

If async is enabled in the transport config (it is by default), the logs are sent to an async dispatcher queue, which will batch send the logs when there is process availability.  This ensures that the logs don't block the main execution thread. This can be toggled off however, if you prefer the logs to be blocking / synchronous

## Configuration

Configuration is a core aspect of LogDash.  

## Examples

Uses in class hierarchies

```
// import the logger created in your logger.ts class

import logger from './logger.ts';

// Usually, you will be grouping / logging functionality close together.  For example, let's say we have our Animal class below

class Animal {
// using the `cp({})` method allows you to make a copy of a logger object.  This is a 1 to 1 copy
// I'm using the `protected` access specifier to make it accessible to child classes

protected log
}

```
