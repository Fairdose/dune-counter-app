<script>
    import {navigate} from "svelte-navigator";

    let room = ''
</script>

<main id="waiting-room">
    <div class="input-section">
        <label>
            <p>Please enter your room number</p>
            <input bind:value={room} type="tel" maxlength="6">
        </label>
        <button on:click={navigate(`/room/${room}`, {replace: true})}>Enter</button>
    </div>
</main>

<style lang="scss">
  @import "src/assets/_variables.scss";

  #waiting-room {
    font-family: $def-font;
    background: $dune-bck;
    border-radius: 5px;
    color: white;
    padding: 0.2em 0.5em;
    height: calc(100vh - 0.4em);
    display: flex;
    justify-content: center;
    align-items: center;

    .input-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      label {
        display: flex;
        flex-direction: column;
        max-width: 50vw;
        text-align: center;
        justify-content: center;
        align-items: center;

        input {
          background: black;
          border: none;
          border-radius: 5px;
          padding: 3px 5px;
          text-align: center;
          color: aliceblue;
          font-family: $def-font;
        }
      }

      button {
        font-family: $def-font;
        padding: 0.3em 0.5em;
        font-weight: bolder;
        color: white;
        background: $dune-bck;
        border: 3px solid #bf6116;
        border-radius: 15px;
        font-size: 1em;
        margin-top: 1em;
        margin-bottom: 1em;
        box-shadow: 3px 3px 3px black;
        cursor: pointer;
        transition: transform 100ms ease-in, box-shadow 200ms ease-in-out;

        &:active {
          transform: translate(1px, 2px);
          box-shadow: 0 0 0 black;
        }
      }
    }
  }
</style>
