import { shallowMount } from '@vue/test-utils'
import CountriesView from '@/views/CountriesView.vue'
import AddCountryForm from '@/components/AddCountryForm.vue'

describe('CountriesView tests', () => {
  test('renders Countries table header row', () => {
    const countriesTableHeaderRow = '<th scope="col">#</th>'
    const wrapper = shallowMount(CountriesView, {
    })
    expect(wrapper.html()).toContain(countriesTableHeaderRow)
  })
  test('renders Countries table header row', () => {

    const countriesTableBody = '<tbody>'
    const wrapper = shallowMount(CountriesView, {
    })
    expect(wrapper.html()).toContain(countriesTableBody)
  })

  test('renders AddCountryForm component after' +
  'Add Country button is clicked', async() => {

    const wrapper = shallowMount(CountriesView, {
    })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(AddCountryForm).exists()).toBe(true)
  })

})