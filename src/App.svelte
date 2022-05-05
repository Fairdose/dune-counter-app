<script>
    import {Router, Route, navigate} from 'svelte-navigator'
    import Home from './routes/Home.svelte'
    import Counter from './routes/[room].svelte'
</script>

<Router>
    <head>
        <title>Dune Counter app</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <main>
        <Route path="room/:room" component={Counter} />
        <Route path="/" component={Home} />
    </main>
</Router>

<style lang="scss">
</style>
