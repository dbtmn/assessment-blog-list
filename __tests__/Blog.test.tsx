import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from 'react-router-dom'
import App from "../src/App";
import { DataTestId } from "../src/constants/DataTestId";
import { Routes } from "../src/constants/Routes";

const mockPosts = [
    {
        id: 1175,
        created_at: '2023-04-15T21:00:59.000000Z',
        updated_at: '2023-04-15T21:00:59.000000Z',
        title: 'a5 showcase',
        content: 'a5',
        category_id: 1,
        img_url: 'images/BC4xpxl40NuYIQMIBoaA9F96quCOShzs9OxSgpVx.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1174,
        created_at: '2023-04-15T19:29:29.000000Z',
        updated_at: '2023-04-15T19:29:29.000000Z',
        title: 'a5 re try',
        content: 'a5',
        category_id: 1,
        img_url: 'images/tuIIuUiExz2HPJjJcFdg1s9CnRwjEOAN4cCsjkVI.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1173,
        created_at: '2023-04-15T19:28:48.000000Z',
        updated_at: '2023-04-15T19:28:48.000000Z',
        title: 'a5',
        content: 'a5',
        category_id: 1,
        img_url: 'images/LEm8BS2Tsf96bPnWS7T3Xhp6u94fnmbVRvfQjCOP.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1172,
        created_at: '2023-04-15T19:27:40.000000Z',
        updated_at: '2023-04-15T19:27:40.000000Z',
        title: 'a5',
        content: 'a5',
        category_id: 1,
        img_url: 'images/42pna03xVtFV0VJktjndG4qsVktIDbq7SLPSpLBs.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1171,
        created_at: '2023-04-15T19:19:24.000000Z',
        updated_at: '2023-04-15T19:19:24.000000Z',
        title: 'a4',
        content: 'a4',
        category_id: 1,
        img_url: 'images/jJHlnOwYk2oOl7wc8lv8P4jVaHb9l2h7eN0t49uJ.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1170,
        created_at: '2023-04-15T19:07:59.000000Z',
        updated_at: '2023-04-15T19:07:59.000000Z',
        title: 'a4',
        content: 'a4',
        category_id: 1,
        img_url: 'images/SydvxCjybJLC1xR1e6R21UZ2Ozj9HyBOdyxWCMLZ.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1169,
        created_at: '2023-04-15T19:03:59.000000Z',
        updated_at: '2023-04-15T19:03:59.000000Z',
        title: 'a4',
        content: 'a4',
        category_id: 1,
        img_url: 'images/e5b96m7UQXyVkyK98wCR3omBGartawTdH1gnPxPc.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    },
    {
        id: 1168,
        created_at: '2023-04-15T18:59:51.000000Z',
        updated_at: '2023-04-15T18:59:51.000000Z',
        title: 'a4',
        content: 'a4',
        category_id: 1,
        img_url: 'images/c96rngYxcVZYAcZdpxyoJjPPOcw1cwIZsVlgzXjJ.png',
        category: {
            id: 1,
            name: 'Tech',
            created_at: null,
            updated_at: null
        }
    }
]
    ;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => jest.clearAllMocks());

test('Loading case', async () => {

    const blogRoute = `${Routes.BLOG}`;
    render(
        <MemoryRouter initialEntries={[blogRoute]}>
            <Provider store={mockStore({
                categories: {
                    pending: false,
                    categories: {},
                    error: null
                },
                filters: {
                    activePage: 1,
                    totalPage: 1
                },
                posts: {
                    pending: true,
                    posts: [],
                    error: false
                }
            })}>
                <App />
            </Provider>
        </MemoryRouter>);

    const { getByTestId } = screen;

    const loading = await waitFor(() => getByTestId(DataTestId.LOADING));
    expect(loading).toBeInTheDocument();
});

test('Error case', async () => {

    const blogRoute = `${Routes.BLOG}`;
    render(
        <MemoryRouter initialEntries={[blogRoute]}>
            <Provider store={mockStore({
                categories: {
                    pending: false,
                    categories: {},
                    error: null
                },
                filters: {
                    activePage: 1,
                    totalPage: 1
                },
                posts: {
                    pending: false,
                    posts: [],
                    error: true
                }
            })}>
                <App />
            </Provider>
        </MemoryRouter>);

    const { getByTestId } = screen;

    const error = await waitFor(() => getByTestId(DataTestId.ERROR));
    expect(error).toBeInTheDocument();
});

test('Page is rendered', async () => {

    const blogRoute = `${Routes.BLOG}`;
    render(
        <MemoryRouter initialEntries={[blogRoute]}>
            <Provider store={mockStore({
                categories: {
                    pending: false,
                    categories: {},
                    error: null
                },
                filters: {
                    activePage: 1,
                    totalPage: 1
                },
                posts: {
                    pending: false,
                    posts: [],
                    error: null
                }
            })}>
                <App />
            </Provider>
        </MemoryRouter>);

    const pageTitle = screen.getByText("Blog");

    expect(pageTitle).toBeInTheDocument();
});

test('Page is changed', async () => {

    const blogRoute = `${Routes.BLOG}`;
    render(
        <MemoryRouter initialEntries={[blogRoute]}>
            <Provider store={mockStore({
                categories: {
                    pending: false,
                    categories: {},
                    error: null
                },
                filters: {
                    activePage: 1,
                    totalPage: 2
                },
                posts: {
                    pending: false,
                    posts: mockPosts,
                    error: null
                }
            })}>
                <App />
            </Provider>
        </MemoryRouter>);

    const { getAllByTestId } = screen;

    const pageChangeButtons = await waitFor(() => getAllByTestId(DataTestId.PAGE));
    expect(pageChangeButtons[0]).toBeInTheDocument();

    fireEvent.click(pageChangeButtons[0]);

    const blogItems = await waitFor(() => getAllByTestId(DataTestId.BLOG_ITEM));
    expect(blogItems).not.toContain(mockPosts);
});
