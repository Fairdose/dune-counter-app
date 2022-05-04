<script>
    import {useParams, navigate} from "svelte-navigator"

    const isAdmin = false
    const params = useParams()

    !$params.room && navigate('/')

    let points = {
        momentum: 0,
        threat: 0,
        extendedTask: []
    }

    let ws = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}?u=a&uType=admin&room=${$params.room}`)

    ws.onmessage = (event) => {
        points = JSON.parse(event.data)
    }

    ws.onerror = (event) => {
        ws = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}?u=a&uType=admin&room=${$params.room}`)
        console.log(event)
    }

    window.addEventListener('beforeunload', () => {
        ws.close()
    })

    const sendPoints = async () => {
        await ws.send(JSON.stringify(points))
    }

    /*
    let pingWs = setInterval(() => {
        ws.send([0x9])
    },10000)
*/

</script>

<div id="counter-pad">
    <div class="tools"></div>
    <label class="cp-momentum-counter">
        <span>Momentum</span>
        <input class="sparky" bind:value={points.momentum} on:blur={sendPoints} name="momentum" type="tel">
    </label>
    <label class="cp-threat-counter">
        <span>Threat</span>
        <input bind:value={points.threat} on:blur={sendPoints} name="threat" type="tel">
    </label>
    {#each points.extendedTask as eTask}
        <label class="cp-extended-counter">
    <span>Extended Task <br>
      <em>({eTask.name})</em>
    </span>
            <input bind:value={eTask.value} disabled={!isAdmin} name="extended-task" on:blur={sendPoints}
                   type="tel">
        </label>
    {/each}
</div>

<!--suppress CssUnknownTarget -->
<style lang="scss">
  @use "src/assets/_variables";
  @font-face {
    font-family: dune_font;
    src: url("/static/fonts/Dune_Rise.ttf");
  }

  #counter-pad {
    font-family: dune_font, sans-serif, Tahoma;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    pointer-events: auto;
    margin: 0;
    font-size: 1.3em;
    font-weight: bolder;
    color: #e8e8e8;

    & > [class*="-counter"] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2em;
      border: 2px solid #464646;
      border-radius: 5px;
      padding: 0.2em 0.5em;
      background: linear-gradient(100deg, rgb(0, 0, 0), rgba(255, 108, 0, 0.8), rgba(255, 108, 0, 0.4), rgba(0, 0, 0, 0.1));

      &:last-of-type {
        margin-bottom: 0;
      }

      & > span {
        margin-right: 1em;

        & > em {
          font-size: 0.65em;
        }
      }

      & > input {
        width: 100%;
        height: 100%;
        max-width: 1.1em;
        max-height: 1.1em;
        border-radius: 50%;
        text-align: center;
        -webkit-appearance: none;
        margin: 0;
        -moz-appearance: textfield;
        outline: none;
        background: #f95959;
        color: white;
        font-size: 0.9em;
        padding: 0.3em;
        border: 2px black solid;
      }
    }
  }

  .sparky {
    position: relative;
  }
</style>
