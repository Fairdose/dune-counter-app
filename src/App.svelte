<script>
    import { Router, Route, navigate } from 'svelte-navigator'
    import Home from "./routes/Home.svelte"
    import Counter from './routes/[room].svelte'
</script>

<Router>
    <main>
        <Route path="room/:room" component={Counter} />
        <Route path="/" component={Home} />
    </main>
</Router>
