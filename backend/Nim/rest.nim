const inMemory = false

when inMemory:
  import ./inMemoryViews
else:
  import ./mongoViews

