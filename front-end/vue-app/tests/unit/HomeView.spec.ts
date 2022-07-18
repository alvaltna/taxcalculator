import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import GreetingMessage from '@/components/GreetingMessage.vue'

describe('HomeView tests', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(GreetingMessage, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })

  test('renders Select Country dropdown', () => {
    const selectCountry = 'Select country'
    const wrapper = shallowMount(HomeView, {
    })
    expect(wrapper.html()).toContain(selectCountry)
  })
})
