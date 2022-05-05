<script>
    import { Router, Route, Link } from 'svelte-navigator'
    import Home from "./routes/Home.svelte"
    import Counter from './routes/[room].svelte'

    $: console.log(window.location.pathname)

</script>

<Router>
    <head>
        <title>Dune Counter app</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <main>
        <div class="refresh" on:click={() => document.location.href = document.location.href}>
            <i class="fa fa-refresh"></i>
        </div>
        <div class="exit-room">
            <Link to="/">
                <i class="fa fa-arrow-up"></i>
            </Link>
        </div>
        <Route path="room/:room" component={Counter} />
        <Route path="/" component={Home} />
    </main>
</Router>

<style lang="scss">
    .refresh,
    .exit-room {
      color: whitesmoke;
      position: absolute;
      background: grey;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      cursor: pointer;
      transition: transform 300ms linear;
      border: 2px solid #464646;

      &:is(.refresh) {
        right: 5px;
        top: 5px;
        &:hover {
          transform: rotate(45deg);
        }
      }

      &:is(.exit-room) {
        right: 35px;
        top: 5px;
      }
    }
</style>
