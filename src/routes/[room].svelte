<script>
    import {useParams, navigate} from "svelte-navigator"
    import ExtendedTask from "../objects/extendedTask.js";

    const params = useParams()

    !$params.room.match('^[0-9]*$') && navigate('/')
    !$params.room && navigate('/')

    let ws = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}?u=a&user=admin&room=${$params.room}`)

    let addTaskContainer = false
    let points = {
        momentum: 0,
        threat: 0,
        extendedTask: []
    }

    ws.onmessage = (event) => {
        points = JSON.parse(event.data)
    }

    ws.onerror = (event) => {
        console.log(event)
    }

    window.addEventListener('beforeunload', () => {
        ws.close()
    })

    const sendPoints = async () => {
        await ws.send(JSON.stringify(points))
    }

    const addExtendedTask = (e) => {
    }
</script>

<div id="counter-pad">
    <head>
        <title>Dune Counter app</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <div class="tools">
        <div class="room-id">Room: {$params.room}</div>
        <div class="tool add-task">
            <i class="fa fa-plus" on:click={() => addTaskContainer = !addTaskContainer}></i>
            {#if addTaskContainer}
            <div class="add-task-input" >
                <div>
                    <label for="task-name">
                    </label>
                    <input id="task-name" type="text" name="task-name">
                    <label for="task-value">
                    </label>
                    <input id="task-value" type="number" name="task-value">
                    <button type="submit" on:click={addExtendedTask}>Add</button>
                </div>
            </div>
            {/if}
        </div>
        <div class="tool refresh" on:click={() => document.location.href = document.location.href}>
            <i class="fa fa-refresh"></i>
        </div>
        <div class="tool exit-room" on:click={() => navigate('/', {replace: true})}>
            <i class="fa fa-home"></i>
        </div>
    </div>
    <div class="cp-momentum-counter">
        <span>Momentum</span>
        <span class="points-cta">
            <button on:click={() => { sendPoints(points.momentum++) }}>+</button>
            <button on:click={() => { sendPoints(points.momentum--) }}>-</button>
        </span>
        <input class="sparky" bind:value={points.momentum} name="momentum" type="tel" disabled>
    </div>
    <div class="cp-threat-counter">
        <span>Threat</span>
        <span class="points-cta">
            <button on:click={() => { sendPoints(points.threat++) }}>+</button>
            <button on:click={() => { sendPoints(points.threat--) }}>-</button>
        </span>
        <input bind:value={points.threat} name="threat" type="tel" disabled>
    </div>
    {#each points.extendedTask as eTask}
        <div class="cp-extended-counter">
            <span>
                Extended Task <br>
                <em>({eTask.name})</em>
            </span>
            <span class="points-cta">
                <button on:click={() => { sendPoints(eTask.value++) }}>+</button>
                <button on:click={() => { sendPoints(eTask.value--) }}>-</button>
            </span>
            <input bind:value={eTask.value} name="extended-task" type="tel" disabled>
        </div>
    {/each}
</div>

<!--suppress CssUnknownTarget -->
<style lang="scss">
  @import "src/assets/_variables";

  @font-face {
    font-family: dune_font;
    src: url("/static/fonts/Dune_Rise.ttf");
  }

  #counter-pad {
    font-family: $def-font;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    pointer-events: auto;
    font-size: 1.3em;
    font-weight: bolder;
    color: #e8e8e8;

    .tools {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

      .room-id {
        font-size: 0.6em;
        padding: 3px 30px 3px 10px;
        border: 2px solid #464646;
        border-radius: 15px 0 30px 0;
        background: $dune-bck;
        margin-right: auto;
      }

      & > .tool {
        color: whitesmoke;
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
        font-size: 0.7em;
        margin-left: 5px;

        &:is(.refresh) {
          &:hover {
            transform: rotate(45deg);
          }
        }
        &:is(.add-task) {
          .add-task-input {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: auto;
            cursor: auto;
            & > form {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
          }
        }
      }
    }

    [class*="-counter"] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2em;
      border: 2px solid #464646;
      border-radius: 5px;
      padding: 0.2em 0.5em;
      background: $dune-bck;

      &[class*="extended"] {
        & > span {
          font-size: 0.6em;
        }
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      & > span {
        margin-right: 15px;

        & > em {
          font-size: 0.65em;
        }

        &.points-cta {
          margin-left: auto;
          display: flex;

          button {
            color: black;
            width: 1.7em;
            height: 1.7em;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 3px;
            cursor: pointer;
          }
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
