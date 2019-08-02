<style>
  @keyframes flowSlideUp {
    from {
      transform: translateY(10%);
      opacity: 0;
    }
    33% {
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .entrance-flow {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(-25deg, #fff 0%, #000 70%);
  }

  .entrance-flow .entrance-flow-box {
    overflow: auto;
    width: 400px;
    padding: 18px;
    margin: 18px;
    box-shadow: rgba(0, 0, 0, .2) 0px 0px 10px;
    animation: flowSlideUp 0.6s;
    animation-timing-function: ease-in-out;
  }

  .entrance-flow .entrance-flow-box :global(h1) {
    font-size: 1.5em;
    padding-bottom: 10px;
    text-align: center;
    font-style: italic;
  }
</style>

<div class="entrance-flow">
  <div class="entrance-flow-box team-select">
    <slot />
  </div>
</div>